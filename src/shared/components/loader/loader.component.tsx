
interface LoaderInterface {
    showLoader: boolean
}

export const LoaderComponent = ({showLoader} : LoaderInterface) => {
    return <>
    {showLoader && (
            <div className="absolute h-screen inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
              <span className="loading loading-dots loading-xl text-black"></span>
            </div>
          )}</>
}