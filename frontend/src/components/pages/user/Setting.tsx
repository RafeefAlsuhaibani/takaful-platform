import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserSettings() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/user/main', {
            replace: true,
            state: { showSettingsComingSoonToast: true },
        });
    }, [navigate]);

    return <div className="h-full" />;
}
