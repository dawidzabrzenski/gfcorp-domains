import Spinner from "./Spinner";

function FullscreenLoading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-dark-mainbg">
      <p className="text-mainfont">Ładowanie aplikacji</p>
      <Spinner />
    </div>
  );
}

export default FullscreenLoading;
