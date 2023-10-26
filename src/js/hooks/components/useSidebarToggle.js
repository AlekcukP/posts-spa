import { useState, useMemo, useCallback } from 'react';

export const useSidebarToggle = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = useCallback(
        () => setSidebarOpen(!isSidebarOpen),
        [isSidebarOpen]
    );

    const memoValues = useMemo(() => ({ isSidebarOpen }), [isSidebarOpen]);

    return { ...memoValues, toggleSidebar };
}
