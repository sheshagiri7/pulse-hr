/** @odoo-module **/

import { Component, onWillStart, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class PulseDashboard extends Component {
    static template = "pulse_hr.PulseDashboard";

    setup() {
        this.orm = useService("orm");
        this.action = useService("action");
        this.notification = useService("notification");

        this.state = useState({
            loading: true,
            currentTab: "all", // 'all' | 'present' | 'absent' | 'leave'
            currentView: "employee", // 'employee' | 'hr'
            searchQuery: "",
            metrics: {
                total_employees: 0,
                present_count: 0,
                absent_count: 0,
                leave_count: 0,
                attendance_rate: 0,
                user_streak: 5,
                user_leave_pct: 80,
                user_leave_remaining: 16,
            },
            employees: [],
            isHrManager: false,
            currentUserName: "",
        });

        onWillStart(async () => {
            await this.loadDashboardData();
        });
    }

    async loadDashboardData() {
        this.state.loading = true;
        try {
            const data = await this.orm.call("hr.employee", "get_pulse_dashboard_data", []);
            this.state.metrics = data.metrics || {};
            this.state.employees = data.employees || [];
            this.state.isHrManager = data.is_hr_manager || false;
            this.state.currentUserName = data.current_user_name || "Employee";
        } catch (error) {
            console.error("Failed to load Pulse HR dashboard data:", error);
            if (this.notification) {
                this.notification.add("Could not load dashboard metrics", { type: "danger" });
            }
        } finally {
            this.state.loading = false;
        }
    }

    get filteredEmployees() {
        let list = this.state.employees;
        if (this.state.currentTab !== "all") {
            list = list.filter((emp) => emp.status === this.state.currentTab);
        }
        if (this.state.searchQuery && this.state.searchQuery.trim() !== "") {
            const query = this.state.searchQuery.toLowerCase();
            list = list.filter(
                (emp) =>
                    emp.name.toLowerCase().includes(query) ||
                    emp.job_title.toLowerCase().includes(query) ||
                    emp.department.toLowerCase().includes(query) ||
                    emp.login_id.toLowerCase().includes(query)
            );
        }
        return list;
    }

    setTab(tab) {
        this.state.currentTab = tab;
    }

    setView(view) {
        this.state.currentView = view;
    }

    onSearchInput(ev) {
        this.state.searchQuery = ev.target.value;
    }

    async openEmployeeDetail(employeeId) {
        await this.action.doAction({
            type: "ir.actions.act_window",
            res_model: "hr.employee",
            res_id: employeeId,
            views: [[false, "form"]],
            target: "current",
        });
    }

    async navigateToAttendances() {
        await this.action.doAction("hr_attendance.hr_attendance_action");
    }

    async navigateToLeaves() {
        await this.action.doAction("hr_holidays.hr_leave_action_action_approve_department");
    }
}

registry.category("actions").add("pulse_hr.dashboard", PulseDashboard);
