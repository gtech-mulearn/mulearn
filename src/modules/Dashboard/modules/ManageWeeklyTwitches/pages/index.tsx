import { useState } from "react";
import {
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useDisclosure
} from "@chakra-ui/react";
import styles from "../ManageWeeklyTwitches.module.css";
import { contentTypeConfigs } from "../config/contentTypes";
import { ContentTypeKey } from "../services/types";
import MediaContentTab from "../components/MediaContentTab";
import BulkImportModal from "../components/BulkImportModal";

const ORDER: ContentTypeKey[] = [
    "officeHours",
    "saltMangoTree",
    "inspirationStation"
];

const ManageWeeklyTwitches = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.pageTitle}>Manage Weekly Twitches</h1>
                    <p className={styles.pageSubtitle}>
                        Create, edit, and manage Office Hours, Salt Mango Tree,
                        and Inspiration Station content.
                    </p>
                </div>
                <Button colorScheme="blue" variant="outline" onClick={onOpen}>
                    ⬆ Import CSV
                </Button>
            </div>
            <Tabs colorScheme="blue" isLazy>
                <TabList overflowX="auto" overflowY="hidden" whiteSpace="nowrap">
                    {ORDER.map(key => (
                        <Tab key={key}>{contentTypeConfigs[key].label}</Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {ORDER.map(key => (
                        <TabPanel key={key} px={0}>
                            <MediaContentTab
                                config={contentTypeConfigs[key]}
                                refreshKey={refreshKey}
                            />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>

            <BulkImportModal
                isOpen={isOpen}
                onClose={onClose}
                onImported={() => setRefreshKey(k => k + 1)}
            />
        </div>
    );
};

export default ManageWeeklyTwitches;
