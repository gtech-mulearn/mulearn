import React, { useState } from 'react'
// import { links } from './Mylinks'
const SearchBar = ({ changeVisibility, isVisible }) => {

    // function runAnalysis(links) {
    //     const list = []
    //     links.map(link => {
    //         if (link.submenu) {
    //             list.push(...runAnalysis(link.sublinks))
    //         }
    //         else {
    //             list.push({ "name": link.name, "link": link.link })
    //         }
    //     })
    //     console.log(list)
    // }

    function find(value) {
        const searchValue = new RegExp(value, "ig")
        return list.filter(link => searchValue.test(link.name))
    }
    const [results, setResults] = useState(list)


    return (
        <div className='flex justify-center items-center flex-col pb-4 bg-white'>
            <input type="text" placeholder="Search" className="searchBar " onInput={(e) => {
                setResults(find(e.target.value))
                changeVisibility(true)
                if (e.target.value === "") changeVisibility(false)
            }} />
            <div className={`${isVisible ? "flex" : "hidden"} z-50 flex-col w-[80%] overflow-y-auto items-center max-h-96 rounded-2xl`}>
                {results.map(value => (
                    <a href={value.link} className="normal-case p-2 border-b-2 bg-gray-200 border-black/10 w-full" >{value.name}</a>
                ))}
            </div>
        </div >
    )
}
const list = [
    {
        "name": "Our Team",
        "link": "/team"
    },
    {
        "name": "Community Partners",
        "link": "/community-partners"
    },
    {
        "name": "Company Partners",
        "link": "/company-partners"
    },
    {
        "name": "Enablers & Mentors",
        "link": "/participate"
    },
    {
        "name": "Overall Leaderboards",
        "link": "/leaderboard"
    },
    {
        "name": "Monthly Leaderboards",
        "link": "/leaderboard/monthly"
    },
    {
        "name": "Gallery",
        "link": "/gallery"
    },
    {
        "name": "News",
        "link": "/news"
    },
    {
        "name": "Blogs",
        "link": "/blogs"
    },
    {
        "name": "Home Page",
        "link": "/campuschapters"
    },
    {
        "name": "Campus Logo Generator",
        "link": "/campuschapters/#logo-generator"
    },
    {
        "name": "Success Stories",
        "link": "/blogs"
    },
    {
        "name": "YIP 2021",
        "link": "/yip"
    },
    {
        "name": "Foundation Program",
        "link": "https://foundation.mulearn.org"
    },
    {
        "name": "Art of Teaching",
        "link": "/artofteaching"
    },
    {
        "name": "Bootcamps",
        "link": "/bootcamps"
    },
    {
        "name": "Wiki Syllabus",
        "link": "/wikisyllabus"
    },
    {
        "name": "Hacktober Fest",
        "link": "/hacktoberfest"
    },
    {
        "name": "Build For Team",
        "link": "/buildforteam"
    },
    {
        "name": "Calendar",
        "link": "/calendar"
    },
    {
        "name": "Announcements",
        "link": "/announcements"
    },
    {
        "name": "Home",
        "link": "/events"
    },
    {
        "name": "Inspiration Station",
        "link": "/isr"
    },
    {
        "name": "Mentor Connect",
        "link": "/events/mentorconnect"
    },
    {
        "name": "Open Mic",
        "link": "/events/openmic"
    },
    {
        "name": "Salt Mango Tree",
        "link": "/events/saltmangotree"
    },
    {
        "name": "Home Page",
        "link": "https://learn.mulearn.org/"
    },
    {
        "name": "Android Development",
        "link": "https://learn.mulearn.org/android"
    },
    {
        "name": "Artificial Intelligence",
        "link": "https://learn.mulearn.org/ai"
    },
    {
        "name": "Cyber Security",
        "link": "https://learn.mulearn.org/cybersec"
    },
    {
        "name": "IoT",
        "link": "https://learn.mulearn.org/iot"
    },
    {
        "name": "Product Management",
        "link": "https://learn.mulearn.org/pm"
    },
    {
        "name": "UI / UX",
        "link": "https://learn.mulearn.org/uiux"
    },
    {
        "name": "Web Development",
        "link": "https://learn.mulearn.org/web"
    },
    {
        "name": "Home",
        "link": "https://learn.mulearn.org/bootcamps"
    },
    {
        "name": "Android",
        "link": "https://learn.mulearn.org/bootcamps/android"
    },
    {
        "name": "Artificial Intelligence",
        "link": "https://learn.mulearn.org/bootcamps/ai"
    },
    {
        "name": "CTF",
        "link": "https://learn.mulearn.org/bootcamps/ctf"
    },
    {
        "name": "Flutter",
        "link": "https://learn.mulearn.org/bootcamps/flutter"
    },
    {
        "name": "Rust",
        "link": "https://learn.mulearn.org/bootcamps/rust"
    },
    {
        "name": "JavaScript",
        "link": "https://learn.mulearn.org/bootcamps/javascript"
    },
    {
        "name": "Python",
        "link": "https://learn.mulearn.org/bootcamps/python"
    },
    {
        "name": "OpenSource Projects",
        "link": "https://learn.mulearn.org/opensource"
    },
    {
        "name": "Problem Shelf",
        "link": "https://learn.mulearn.org/problemshelves"
    },
    {
        "name": "Challenges",
        "link": "https://learn.mulearn.org/challenges"
    },
    {
        "name": "Courses",
        "link": "https://learn.mulearn.org/courses"
    },
    {
        "name": "API Setu",
        "link": "https://learn.mulearn.org/apisetu"
    },
    {
        "name": "Create Circle",
        "link": "https://learn.mulearn.org/create"
    },
    {
        "name": "Join Circles",
        "link": "https://learn.mulearn.org/join"
    },
    {
        "name": "Mentor Directory",
        "link": "https://learn.mulearn.org/mentors"
    },
    {
        "name": "Existing Circles",
        "link": "https://learn.mulearn.org/searchcircles"
    }
]

export default SearchBar