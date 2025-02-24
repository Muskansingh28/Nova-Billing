export default function DetailCard(props) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative w-full">
        <input
          onChange={(e) => props.onInput(e)}
          id={props.name}
          name={props.name}
          type={props.type} 
          value={props.value}
          className="border-b no-arrows w-full border-gray-600 py-1 focus:border-b-2 focus:border-blue-300 transition-colors focus:outline-none peer bg-inherit"
        />
        <label
          htmlFor={props.name}
          className={`text-gray-800 absolute left-0 cursor-text peer-focus:text-xs md:text-sm mobile:text-xs transition-all peer-focus:text-blue-300 ${props.value ? `-top-4 text-xs` : 'top-1'}`}
        >
          {props.label}
        </label>
      </div>
    </div>
  );
}
