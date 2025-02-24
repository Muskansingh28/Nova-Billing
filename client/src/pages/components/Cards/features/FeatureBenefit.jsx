
export default function FeatureBenefit(props) {
    return (
        <div className="w-64 min-h-40 max-h-56 rounded-lg bg-gray-500 bg-opacity-40 border border-gray-600 flex flex-col justify-center items-center space-y-3 ">
        <div className="rounded-lg bg-gray-500 bg-opacity-65 p-2 shadow-2xl ">
            {props.svg}
        </div>

        <p className="text-white font-normal text-xl mobile:text-lg tracking-wide text-center drop-shadow-lg">{props.title}</p>

        <p className="text-gray-400 text-sm mobile:text-xs text-center">{props.subTitle}</p>

      </div>
    )
}