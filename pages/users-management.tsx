import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Main from "@/components/layouts/main";
import { useListUsers } from "@/services/users";
import Table from "@/components/table";
import { selectors } from "@/store";
import { useSocketIoClient } from "@/hooks/useSocketIoClient";
import { EventUserStatus } from "@/services/users/type";
import { MyComponentMethods } from "@/components/table/type";
import { User } from "@/services/auth/type";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const columns = selectors.users.columns();
  const refTable = useRef<MyComponentMethods>(null);
  const router = useRouter();
  const [name, setName] = useState("");
  const debouncedName = useDebounce(name, 700);
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const clientSocket = useSocketIoClient();
  useEffect(() => {
    clientSocket?.subscribeToNamespace(
      "users",
      "userConnected",
      (e: EventUserStatus) => {
        refTable.current?.updateRow((value: User) => value.id == e.id, {
          connectionStatus: e.status,
          lastSeenAt: e.lastSeenAt,
        });
      }
    );
    return () => {
      clientSocket?.disconnectNamespace("users");
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-center bg-base-100  w-full h-full flex-col">
        <div className="mx-10  mt-10 overflow-hidden">
          <div>
            <div className="flex w-full justify-between">
              <button
                onClick={() => router.back()}
                className="btn btn-outline  btn-sm"
              >
                Back
              </button>
              <h1 className="text-4xl mb-2 text-center font-bold">
                Users Management
              </h1>
              <div></div>
            </div>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="input input-primary input-sm m-2"
              placeholder="Search by name"
            />
          </div>
          <Table
            ref={refTable}
            className="min-h-4/6"
            columns={columns}
            filter={{ name: debouncedName }}
            fetchQuery={useListUsers}
          />
        </div>
      </div>
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Main>{page}</Main>;
};

export default Page;
