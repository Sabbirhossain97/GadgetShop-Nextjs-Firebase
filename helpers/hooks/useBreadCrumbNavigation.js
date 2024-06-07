import { useState, useEffect } from "react";

const useBreadCrumbNavigation = (pathname) => {
    const [breadcrumbNav, setBreadcrumbNav] = useState([])

    useEffect(() => {
        const pathParts = pathname.split('/').filter(part => part);
        const breadcrumbs = pathParts.map((part, index) => {
            const href = '/' + pathParts.slice(0, index + 1).join('/');
            return { name: part, href };
        });

        setBreadcrumbNav(breadcrumbs);
    }, [pathname]);

    return breadcrumbNav
}

export default useBreadCrumbNavigation