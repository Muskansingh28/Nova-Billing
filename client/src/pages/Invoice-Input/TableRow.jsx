
export default function TableRow (props) {
  return (
    <tr className="w-full">
      <td>
        {" "}
        <input
          type="text"
          name="itemName"
          value={props.rows[props.index]?.itemName || ""}
          onChange={(e) => props.handleRowInputChange(e, props.index)}
          className="w-full p-4  md:text-sm mobile:text-xs text-white outline-none bg-transparent border-b border-slate-900"
          placeholder="Item Name"
        />
      </td>
      <td>
        {" "}
        <input
          type="number"
          name="qty"
          value={props.rows[props.index]?.qty || ""}
          onChange={(e) => props.handleRowInputChange(e, props.index)}
          className="w-full p-4  md:text-sm mobile:text-xs text-white outline-none bg-transparent border-b border-slate-900 no-arrows"
          placeholder="1"
        />
      </td>
      <td>
        {" "}
        <input
          type="number"
          name="rate"
          value={props.rows[props.index]?.rate || ""}
          onChange={(e) => props.handleRowInputChange(e, props.index)}
          className="w-full p-4  md:text-sm mobile:text-xs text-white outline-none bg-transparent border-b border-slate-900 no-arrows"
          placeholder="₹ 1"
        />
      </td>
      <td className="flex justify-center items-center pr-2">
        {" "}
        <input
          type="number"
          name="amount"
          value={props.rows[props.index]?.amount || ""}
          disabled
          className="w-full p-4  md:text-sm mobile:text-xs text-white outline-none bg-transparent border-b border-slate-900 font-semibold no-arrows"
          placeholder="₹1.00"
        />
        <svg
          onClick={(e) => props.handleDeleteRow(e, props.index)}
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="rgb(0 0 0 / 0.55)"
          className="bi bi-trash hover:scale-110 hover:drop-shadow-2xl hover:fill-red-800 "
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </td>
    </tr>
  );
}
