import React from 'react'

const MyMission = ({ mission }) => {

  return (
    <div className="mission-details">
      {
        console.log(mission)
      }
      <div className="flex font-sans">
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <div className="w-full flex-none mt-2  text-xl font-bold text-violet-600">
              {mission.title}</div>
            <h1 className="flex-auto font-medium text-slate-900">
              {mission.description}
            </h1>

            <div className="text-sm font-medium text-slate-400"> {mission.address} | {mission.date} | {mission.time} </div>
          </div>

          <div className="flex space-x-4 mb-5 text-sm font-medium">
            <button className="flex-none flex w-9 h-9 rounded-full text-violet-600 bg-violet-50" type="button" aria-label="Like">
              <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-slate-500">
            Mission created by <a> {mission.user_creator.full_name}</a>
          </p>
          <button
            className={`py-2 px-4 rounded ${mission.taken ? 'bg-purple-600 text-white' : 'border-purple-600 text-purple-600'} `}
          >
            {mission.taken ? 'Taken' : 'Not Taken'}
          </button>

        </form>
      </div>

    </div>
  );
}

export default MyMission