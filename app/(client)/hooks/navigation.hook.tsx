import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useNavigation = () => {
    const router = useRouter();

    const to = useCallback(
        (path: string = "/") => {
            router.push(path);
        },
        [router]
    );

    return { to };
};

export default useNavigation;