import React from 'react';

import MenuCategory from './MenuItem';

export const SideMenu = () => {
  return (
    <div className="c-admin-side-menu">
      <>
        <MenuCategory
          heading={{ title: 'Movies', to: '/admin', icon: 'movie' }}
          subItems={[
            { title: 'All Movies', to: '/admin/movies' },
            { title: 'Add New Movie', to: '/admin/movies/new-movie' },
            { title: 'Movies Lists', to: '/admin/movies/movie-list' },
          ]}
        />
        <MenuCategory
          heading={{ title: 'Actor', to: '/admin', icon: 'user' }}
          subItems={[
            { title: 'Actor List', to: '/movie/add-movie' },
            { title: 'Add New Actor', to: '/auth/register' },
          ]}
        />
        <MenuCategory heading={{ title: 'Setting', to: '/admin', icon: 'widget' }} subItems={[]} />
      </>
    </div>
  );
};

export default SideMenu;
