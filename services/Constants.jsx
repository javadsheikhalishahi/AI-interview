import { CalendarDays, LayoutDashboardIcon, ListChecks, Settings, Wallet2 } from "lucide-react"

export const SideBarOptions = [
    {
        name: 'Dashboard',
        icon: LayoutDashboardIcon,
        path: '/dashboard'
    },
    {
        name: 'Planned Interview',
        icon: CalendarDays,
        path: '/scheduled-interview'
    },
    {
        name: 'All Interview',
        icon: ListChecks,
        path: '/all-interview'
    },
    {
        name: 'Billing',
        icon: Wallet2,
        path: '/billing'
    },
    {
        name: 'Settings',
        icon: Settings,
        path: '/settings'
    },
]