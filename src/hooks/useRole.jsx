import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = 'donor', isLoading: roleLoading } = useQuery({
        queryKey: ['role', user?.email],
        // Only run the query if authentication has finished loading and we have an email
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/role/${user?.email}`);
            return data.role;
        }
    });

    return [role, roleLoading];
};

export default useRole;