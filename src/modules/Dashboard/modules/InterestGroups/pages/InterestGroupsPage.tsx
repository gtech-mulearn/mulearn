import React, { useEffect, useRef, useState } from 'react';
import { Search, Users, ChevronLeft, ChevronRight, Users2 } from 'lucide-react';
import styles from './InterestGroupsPage.module.css';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { getInterestGroups, getInterestGroupsList } from '../../InterestGroup/apis';
import MuLoader from '@/MuLearnComponents/MuLoader/MuLoader';
import {InterestGroupData, interestGroups} from "../data/interestGroups"; 

function InterestGroupsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();
  const [interestgroups, setInterestGroups] = useState<any[]>([]);  

  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage, setPerPage] = useState(20);
  const firstFetch = useRef(true);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'creative', name: 'Creative' },
    { id: 'software', name: 'Software' },
    { id: 'maker', name: 'Maker' },
    { id: 'management', name: 'Management' },
  ];

  const imageUrls = [
    { title: "UI/UX Interest Group", image: "/assets/IG/Cover/1.png" },
    { title: "Web Development", image: "/assets/IG/Cover/2.png" },
    { title: "Cybersecurity", image: "/assets/IG/Cover/3.png" },
    { title: "Digital Marketing", image: "/assets/IG/Cover/4.png" },
    { title: "Game Development", image: "/assets/IG/Cover/5.png" },
    { title: "Cloud and DevOps", image: "/assets/IG/Cover/6.png" },
    { title: "Product Management", image: "/assets/IG/Cover/7.png" }
  ];
  

  useEffect(() => {
    if (firstFetch.current) {
      getInterestGroupsList(
        setData,
        setIsLoading,
        1,
        perPage,
        "",
      );
    }
    firstFetch.current = false;
  }, []);

  const mappedData:InterestGroupData[] = interestGroups.filter(e => 
    data.some(d => d.id === e.id)
  );


  const filteredGroups = mappedData.filter(group => {
    const matchesSearch = group.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });


  // Pagination
  // const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGroups = filteredGroups.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.MainWrapper}>
      <div className={styles.Banner}>
        <div className={styles.BannerContent}>
          <h1 className={styles.BannerTitle}>Discover Interest Groups</h1>
          <p className={styles.BannerSubtitle}>Join communities that share your passion</p>
        </div>
      </div>

      <div className={styles.Container}>
        {/* Search and Filter Section */}
        <div className={styles.SearchFilterWrapper}>
          <div className={styles.SearchFilterInner}>
            {/* Search Bar */}
            <div className={styles.SearchBar}>
              <Search className={styles.SearchIcon} />
              <input
                type="text"
                placeholder="Search interest groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.SearchInput}
              />
            </div>

            {/* Category Filter */}
            {/* <div className={styles.CategoryFilter}>
              {categories.map((category) => (
                <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                  ? styles.CategoryButtonActive
                  : styles.CategoryButton
                }
                >
                  {category.name}
                </button>
              ))}
            </div> */}
          </div>
        </div>
        {isLoading && (
          <div>
            <MuLoader />
          </div>
        )}

        {/* Interest Groups Grid */}
        <div className={styles.Grid}>
          {paginatedGroups.map((group) => (
            <div
            key={group.id}
            className={styles.GroupCard}
            onClick={() => navigate(`/dashboard/interestgroups/${group.id}`)}
          >
            <div className={styles.GroupImageWrapper}>
              {group.image ? (
                <img
                  src={group.image}
                  alt={group.title}
                  className={styles.GroupImage}
                />
              ) : (
                (() => {
                  const randomIndex = Math.floor(Math.random() * imageUrls.length);
                  const randomImageUrl = imageUrls[randomIndex];
                  return (
                    <img
                    src={
                      imageUrls.find(img => img.title === group.title)?.image ||
                      imageUrls[6].image
                    }
                    alt={group.title}
                  />
                  );
                })()
              )}
              <div className={styles.GroupOverlay}>
                <span className={styles.GroupParticipantsBadge}>
                  <Users2 className={styles.GroupParticipantsIcon} />
                  {group.memberCount} 
                </span>
              </div>
            </div>
            <div className={styles.GroupDetails}>
              {group.category && <span className={styles.GroupCategory}>
                {categories.find(c => c.id === group.category)?.name}
                </span>}
            
              <h3 className={styles.GroupTitle}>{group.title}</h3>
            </div>
          </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.Pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.PaginationButton}
            >
              <ChevronLeft className={styles.PaginationIcon} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={
                  currentPage === page
                    ? styles.PaginationButtonActive
                    : styles.PaginationButton
                }
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.PaginationButton}
            >
              <ChevronRight className={styles.PaginationIcon} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterestGroupsPage;
