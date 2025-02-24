
export default function Benefits_card(props){
    return (
        <div className="w-[40%] flex flex-col justify-center items-center space-y-4">
            <p className="text-3xl font-semibold text-black">{props.title}</p>
            <p className="text-base text-gray-500 font-mono tracking-wide">{props.content}</p>
        </div>
    )
}