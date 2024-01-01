import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import Main from "@/components/layouts/main";
import { useLogout, useMe } from "@/services/auth";
import { selectors } from "@/store";
import InfoAccount from "@/components/info-account";
import Loading from "@/components/loading";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const { isLoading, mutate: logout, isSuccess } = useLogout();

  const { data, isSuccess: InfoMe, isLoading: isLoadingUser } = useMe();
  const router = useRouter();
  const setUser = selectors.auth.setUser();
  const user = selectors.auth.user();
  const destroyUser = selectors.auth.destroyUser();
  //logout
  useEffect(() => {
    if (isSuccess) {
      location.reload();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (InfoMe) {
      setUser(data);
    }
  }, [InfoMe]);

  useEffect(() => {
    () => {
      destroyUser();
    };
  }, []);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-base-100 min-h-min  max-w-xl w-full flex flex-col p-5 rounded-xl shadow-2xl">
          {user && <InfoAccount user={user} />}

          {(!user || isLoadingUser) && <Loading />}

          {user?.roles.includes("admin") && (
            <>
              <button
                className="mt-5 btn btn-success capitalize "
                onClick={() => router.push("/users-management")}
              >
                Users Management
              </button>
            </>
          )}

          <button
            className="mt-5 btn btn-primary capitalize "
            onClick={() => logout()}
          >
            {isLoading && <span className="loading loading-spinner" />}
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Main>{page}</Main>;
};

export default Page;
