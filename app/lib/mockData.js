export const stats = {
  properties: 24,
  occupied: 18,
  monthlyRevenue: 642000,
  pendingMaintenance: 7,
};

export const properties = [
  {
    id: "P-101",
    title: "Skyline Residency",
    city: "Bengaluru",
    rent: 32000,
    status: "Approved",
    availableFrom: "2026-04-01",
    amenities: ["2BHK", "Parking", "Gym"],
  },
  {
    id: "P-102",
    title: "Palm Grove Apartments",
    city: "Pune",
    rent: 24000,
    status: "Pending Approval",
    availableFrom: "2026-03-15",
    amenities: ["1BHK", "Power Backup"],
  },
  {
    id: "P-103",
    title: "Riverfront Heights",
    city: "Hyderabad",
    rent: 28000,
    status: "Approved",
    availableFrom: "2026-03-20",
    amenities: ["2BHK", "Security", "Clubhouse"],
  },
];

export const payments = [
  {
    id: "PAY-8801",
    tenant: "Aman Patel",
    property: "Skyline Residency",
    amount: 32000,
    dueDate: "2026-03-05",
    status: "Pending",
  },
  {
    id: "PAY-8802",
    tenant: "Riya Kulkarni",
    property: "Riverfront Heights",
    amount: 28000,
    dueDate: "2026-03-01",
    status: "Paid",
  },
  {
    id: "PAY-8803",
    tenant: "Karan Nair",
    property: "Palm Grove Apartments",
    amount: 24000,
    dueDate: "2026-02-28",
    status: "Overdue",
  },
];

export const maintenanceRequests = [
  {
    id: "MR-401",
    tenant: "Aman Patel",
    property: "Skyline Residency",
    issue: "Kitchen sink leakage",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "MR-402",
    tenant: "Riya Kulkarni",
    property: "Riverfront Heights",
    issue: "AC not cooling",
    priority: "High",
    status: "Pending",
  },
  {
    id: "MR-403",
    tenant: "Karan Nair",
    property: "Palm Grove Apartments",
    issue: "Lift service delay",
    priority: "Low",
    status: "Completed",
  },
];

export const roleQuickLinks = [
  { role: "Admin", href: "/dashboard/admin" },
  { role: "Owner", href: "/dashboard/owner" },
  { role: "Tenant", href: "/dashboard/tenant" },
];
