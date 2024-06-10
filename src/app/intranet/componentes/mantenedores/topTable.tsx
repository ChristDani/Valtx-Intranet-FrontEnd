export const TopTable = ({title,search,searchData,createItem,crear}:{title:string,search:any,searchData:(e:any)=>void,createItem:(e:any)=>void,crear:boolean}) => {
    return (
        <div className="max-w mt-4 flex flex-wrap items-center justify-between">
        <div className="mb-5 w-96 relative flex ">
          <input
            type="text"
            name="itemtitle"
            className="bg-gray-50 border rounded-xl border-gray-300 text-gray-900 text-sm w-full p-2.5 focus:outline-none  focus:border-gray-400"
            placeholder={title}
            value={search}
            onInput={searchData}
          ></input>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none rounded-full">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L16.657 16.657M16.657 16.657C17.3999 15.9141 17.9892 15.0321 18.3912 14.0615C18.7933 13.0909 19.0002 12.0506 19.0002 11C19.0002 9.94936 18.7933 8.90905 18.3913 7.93842C17.9892 6.96779 17.3999 6.08585 16.657 5.34296C15.9141 4.60007 15.0322 4.01078 14.0616 3.60874C13.0909 3.20669 12.0506 2.99976 11 2.99976C9.94942 2.99976 8.90911 3.20669 7.93848 3.60874C6.96785 4.01078 6.08591 4.60007 5.34302 5.34296C3.84269 6.84329 2.99982 8.87818 2.99982 11C2.99982 13.1217 3.84269 15.1566 5.34302 16.657C6.84335 18.1573 8.87824 19.0002 11 19.0002C13.1218 19.0002 15.1567 18.1573 16.657 16.657Z"
                stroke="#7D7E8A"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {
            crear && <button
            className=" flex flex-row w-32 h-10 items-center justify-center gap-1 rounded-xl bg-sky-400 hover:bg-sky-500"
            onClick={createItem}
          >
            <svg
              className="text-gray-800  dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7 7V5"
              />
            </svg>
            <span className=" text-white font-bold">Agregar</span>
          </button>}
        </div>
    );
}