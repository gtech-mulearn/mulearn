export const dynamicRoute = (route: string, ...args: string[]) => {
	let replacedRoute = route;
    args.forEach(arg => {
        if (arg) {
            replacedRoute = replacedRoute.replace(/\${[a-zA-Z]+}/, arg);
        }
    });
    return replacedRoute;
};

export const lcRoutes = {
    createReport: "/api/v1/dashboard/lc/${LcID}/report/create/",
	getReport: "/api/v1/dashboard/lc/${LcID}/report/${ReportID}/show/",
	transferLead: "/api/v1/dashboard/lc/${LcID}/lead-transfer/${MemberID}/",
	approveRejectRemoveUser: "/api/v1/dashboard/lc/${LcID}/user-accept-reject/${MemberID}/",
	scheduleMeet: "/api/v1/dashboard/lc/${LcID}/schedule-meet/",
	getDetailsUpdateNote: "/api/v1/dashboard/lc/${LcID}/details/",
};
