import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

// Scrolls the window to the top of the page if there is no hash
// /#about will not scroll to top of page
function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}

export default ScrollToTop