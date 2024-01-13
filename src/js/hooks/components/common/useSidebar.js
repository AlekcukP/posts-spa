import { useState, useMemo } from 'react';

export const useSidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => setSidebarOpen(true);

    const hideSidebar = () => setSidebarOpen(false)

    const memoValues = useMemo(() => ({ isSidebarOpen }), [isSidebarOpen]);

    return { ...memoValues, openSidebar, hideSidebar };
}
