import { CSVFile } from "../interfaces/file";

interface Props {
  data: CSVFile[];
}

export default function List(props: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {props.data.map((item, key) => (
        <div
          key={key}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >

          <div className="min-w-0 flex-1">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{item.createdAt}</p>
              <p className="truncate text-sm text-gray-500">{item.filename}</p>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}