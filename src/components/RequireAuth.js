"use client";
import { useRouter } from "next/navigation";

let token;
let refresh;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
  refresh = localStorage.getItem("refresh");
}
const RequireAuth = ({ children }) => {
  const router = useRouter();
  return token && refresh ? children : router.push("/");
};

export default RequireAuth;
