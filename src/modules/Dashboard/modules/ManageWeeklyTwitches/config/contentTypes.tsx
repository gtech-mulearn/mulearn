import { mediaContentRoutes } from "@/MuLearnServices/urls";
import { ContentTypeConfig, ContentTypeKey } from "../services/types";

export const contentTypeConfigs: Record<ContentTypeKey, ContentTypeConfig> = {
    officeHours: {
        key: "officeHours",
        label: "Office Hours",
        route: mediaContentRoutes.officeHours,
        contentType: "office_hours",
        hasZoneFilter: false,
        dateWriteFormat: "DD/MM/YYYY",
        columns: [
            { column: "title", Label: "Title", isSortable: true },
            { column: "performer", Label: "Performer", isSortable: true },
            { column: "designation", Label: "Designation", isSortable: false },
            { column: "date", Label: "Date", isSortable: true },
            { column: "status", Label: "Status", isSortable: false },
            { column: "interest_groups", Label: "Interest Groups", isSortable: false },
            { column: "link", Label: "Link", isSortable: false }
        ],
        fields: [
            { name: "title", label: "Title", kind: "text", required: true },
            { name: "date", label: "Date", kind: "date", required: true },
            { name: "performer", label: "Performer", kind: "text" },
            { name: "designation", label: "Designation", kind: "text" },
            { name: "description", label: "Description", kind: "textarea" },
            { name: "link", label: "Link", kind: "url" },
            { name: "interest_groups", label: "Interest Groups", kind: "interestGroups" },
            { name: "poster_thumbnail", label: "Poster Thumbnail URL", kind: "url" }
        ]
    },
    saltMangoTree: {
        key: "saltMangoTree",
        label: "Salt Mango Tree",
        route: mediaContentRoutes.saltMangoTree,
        contentType: "salt_mango_tree",
        hasZoneFilter: true,
        dateWriteFormat: "YYYY-MM-DD",
        columns: [
            { column: "topic", Label: "Topic", isSortable: true },
            { column: "campus", Label: "Campus", isSortable: true },
            { column: "zone", Label: "Zone", isSortable: true },
            { column: "date", Label: "Date", isSortable: true },
            { column: "status", Label: "Status", isSortable: false },
            { column: "link", Label: "Link", isSortable: false }
        ],
        fields: [
            { name: "topic", label: "Topic", kind: "text", required: true },
            { name: "campus", label: "Campus", kind: "text", required: true },
            { name: "date", label: "Date", kind: "date", required: true },
            { name: "zone", label: "Zone", kind: "zone" },
            { name: "description", label: "Description", kind: "textarea" },
            { name: "link", label: "Link", kind: "url" }
        ]
    },
    inspirationStation: {
        key: "inspirationStation",
        label: "Inspiration Station",
        route: mediaContentRoutes.inspirationStation,
        contentType: "inspiration_station",
        hasZoneFilter: true,
        dateWriteFormat: "YYYY-MM-DD",
        columns: [
            { column: "topic", Label: "Topic", isSortable: true },
            { column: "campus", Label: "Campus", isSortable: true },
            { column: "zone", Label: "Zone", isSortable: true },
            { column: "date", Label: "Date", isSortable: true },
            { column: "status", Label: "Status", isSortable: false },
            { column: "link", Label: "Link", isSortable: false }
        ],
        fields: [
            { name: "topic", label: "Topic", kind: "text", required: true },
            { name: "campus", label: "Campus", kind: "text", required: true },
            { name: "date", label: "Date", kind: "date", required: true },
            { name: "zone", label: "Zone", kind: "zone" },
            { name: "description", label: "Description", kind: "textarea" },
            { name: "link", label: "Link", kind: "url" }
        ]
    }
};
