import { MdArrowBackIosNew } from "react-icons/md";

function HeaderMobile({ title }) {
  return (
    <div className="md:hidden flex w-screen mt-12 h-12 pl-6  text-xl shadow-lg font-bold justify-start text-primary">
      <div className="pt-1 mr-3 cursor-pointer">
        <MdArrowBackIosNew onClick={() => router.push("/home")} />
      </div>
      <div>{title}</div>
    </div>
  );
}

export default HeaderMobile;
