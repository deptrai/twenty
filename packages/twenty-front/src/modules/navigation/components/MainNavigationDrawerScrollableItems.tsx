import { CurrentWorkspaceMemberFavoritesFolders } from '@/favorites/components/CurrentWorkspaceMemberFavoritesFolders';
import { WorkspaceFavorites } from '@/favorites/components/WorkspaceFavorites';
import { NavigationDrawerOpenedSection } from '@/object-metadata/components/NavigationDrawerOpenedSection';
import { RemoteNavigationDrawerSection } from '@/object-metadata/components/RemoteNavigationDrawerSection';
import { RealEstateNavigationSection } from '@/real-estate/components/RealEstateNavigationSection';
import styled from '@emotion/styled';

const StyledScrollableItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const MainNavigationDrawerScrollableItems = () => {
  return (
    <StyledScrollableItemsContainer>
      <RealEstateNavigationSection />
      <NavigationDrawerOpenedSection />
      <CurrentWorkspaceMemberFavoritesFolders />
      <WorkspaceFavorites />
      <RemoteNavigationDrawerSection />
    </StyledScrollableItemsContainer>
  );
};
