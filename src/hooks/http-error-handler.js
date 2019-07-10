import { useState, useEffect } from 'react';

export default axios => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(request => {
        setError(null);
        return request;
    });
    const resInterceptor = axios.interceptors.response.use(res => res, error => {
        setError(error);
    });

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        }
        //perform cleanup when interceptor changes
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler]
}
