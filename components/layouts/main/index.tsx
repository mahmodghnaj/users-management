import InitialLoading from "@/components/Initial-loading";
import { ProvideSocketIoClient } from "@/providers/SocketIoProvider";
import { useInfSession } from "@/services/auth";
import { selectors } from "@/store";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

type componentProps = {
  children: ReactElement;
};
const Main = ({ children }: componentProps) => {
  const router = useRouter();
  const setToken = selectors.auth.setToken();
  const setUser = selectors.auth.setUser();
  const token = selectors.auth.token();
  const { data, isSuccess } = useInfSession({
    enabled: router.isReady && !token,
  });

  useEffect(() => {
    if (isSuccess) {
      setToken(data.token);
      setUser(data.user);
    }
  }, [isSuccess]);
  return (
    <>
      <div className="w-full h-full relative z-0 overflow-hidden">
        <div className="bg-primary pointer-events-none absolute left-20 aspect-square w-96 rounded-full opacity-20 blur-3xl" />
        <div className="bg-success pointer-events-none absolute aspect-square w-full rounded-full opacity-10 blur-3xl" />
        <main className="w-full h-full relative overflow-hidden z-0 flex flex-1 flex-col">
          {!token && (
            <div className="flex items-center justify-center h-full">
              <InitialLoading />
            </div>
          )}
          {token && <ProvideSocketIoClient> {children}</ProvideSocketIoClient>}
        </main>
      </div>
    </>
  );
};
export default Main;
