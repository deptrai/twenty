import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProjectFiles } from '../data/mock-data';
import { type Project, type Property } from '../types';

interface ProjectDetailTabsProps {
  project: Project;
  properties: Property[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeroBanner = styled.div<{ imageUrl?: string }>`
  height: 240px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  background-image: ${({ imageUrl }) =>
    imageUrl
      ? `url(${imageUrl})`
      : 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 32px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    border-radius: 12px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
`;

const ProjectTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
`;

const ProjectMeta = styled.div`
  color: #d0d0d0;
  font-size: 14px;
`;

const TabBar = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #2a2a2a;
  padding: 0 4px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 20px;
  background: none;
  border: none;
  color: ${({ active }) => (active ? '#3b82f6' : '#a0a0a0')};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid
    ${({ active }) => (active ? '#3b82f6' : 'transparent')};
  transition: all 0.2s;
  margin-bottom: -1px;

  &:hover {
    color: ${({ active }) => (active ? '#3b82f6' : '#ffffff')};
  }
`;

const TabContent = styled.div`
  min-height: 400px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 20px;
`;

const StatLabel = styled.div`
  color: #a0a0a0;
  font-size: 12px;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
`;

const StatPercentage = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 12px;
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

const PropertyCard = styled.div`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
  }
`;

const PropertyPlot = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
`;

const PropertyDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: #a0a0a0;
`;

const PropertyStatus = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ status }) => {
    switch (status) {
      case 'AVAILABLE':
        return '#22c55e20';
      case 'RESERVED':
        return '#eab30820';
      case 'DEPOSIT_PAID':
        return '#f9731620';
      case 'SOLD':
        return '#991b1b20';
      default:
        return '#a0a0a020';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'AVAILABLE':
        return '#22c55e';
      case 'RESERVED':
        return '#eab308';
      case 'DEPOSIT_PAID':
        return '#f97316';
      case 'SOLD':
        return '#991b1b';
      default:
        return '#a0a0a0';
    }
  }};
`;

const MasterPlanImage = styled.img`
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  max-width: 1200px;
  width: 100%;
`;

const FilesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FileItem = styled.div`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #3b82f6;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const FileName = styled.div`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`;

const FileMeta = styled.div`
  color: #a0a0a0;
  font-size: 12px;
`;

const Placeholder = styled.div`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 48px;
  text-align: center;
  color: #a0a0a0;
  font-size: 14px;
`;

export const ProjectDetailTabs = ({
  project,
  properties,
}: ProjectDetailTabsProps) => {
  const { t } = useLingui();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return (price / 1_000_000_000).toFixed(1) + 'B VND';
  };

  const availableCount = properties.filter(
    (p) => p.status === 'AVAILABLE',
  ).length;
  const reservedCount = properties.filter(
    (p) => p.status === 'RESERVED',
  ).length;
  const depositCount = properties.filter(
    (p) => p.status === 'DEPOSIT_PAID',
  ).length;
  const soldCount = properties.filter((p) => p.status === 'SOLD').length;

  return (
    <Container>
      <HeroBanner imageUrl={project.imageUrl}>
        <HeroContent>
          <ProjectTitle>{project.name}</ProjectTitle>
          <ProjectMeta>
            {project.developer} · {project.location}
          </ProjectMeta>
        </HeroContent>
      </HeroBanner>

      <TabBar>
        <Tab
          active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        >
          {t`Overview`}
        </Tab>
        <Tab
          active={activeTab === 'properties'}
          onClick={() => setActiveTab('properties')}
        >
          {t`Properties`} ({properties.length})
        </Tab>
        <Tab
          active={activeTab === 'masterplan'}
          onClick={() => setActiveTab('masterplan')}
        >
          {t`Master Plan`}
        </Tab>
        <Tab
          active={activeTab === 'files'}
          onClick={() => setActiveTab('files')}
        >
          {t`Files`}
        </Tab>
        <Tab
          active={activeTab === 'activities'}
          onClick={() => setActiveTab('activities')}
        >
          {t`Activities`}
        </Tab>
      </TabBar>

      <TabContent>
        {activeTab === 'overview' && (
          <>
            <StatsGrid>
              <StatCard>
                <StatLabel>{t`Total Properties`}</StatLabel>
                <StatValue>{project.totalProperties}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>{t`Available`}</StatLabel>
                <StatValue>{project.availableProperties}</StatValue>
                <StatPercentage color="#22c55e">
                  {Math.round(
                    (project.availableProperties / project.totalProperties) *
                      100,
                  )}
                  %
                </StatPercentage>
              </StatCard>
              <StatCard>
                <StatLabel>{t`Reserved`}</StatLabel>
                <StatValue>{reservedCount}</StatValue>
                <StatPercentage color="#eab308">
                  {Math.round((reservedCount / project.totalProperties) * 100)}%
                </StatPercentage>
              </StatCard>
              <StatCard>
                <StatLabel>{t`Sold`}</StatLabel>
                <StatValue>{soldCount}</StatValue>
                <StatPercentage color="#991b1b">
                  {Math.round((soldCount / project.totalProperties) * 100)}%
                </StatPercentage>
              </StatCard>
            </StatsGrid>
          </>
        )}

        {activeTab === 'properties' && (
          <PropertiesGrid>
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                onClick={() =>
                  navigate(`/real-estate/properties/${property.id}`)
                }
              >
                <PropertyPlot>
                  {t`Plot`} {property.plotNumber}
                </PropertyPlot>
                <PropertyDetails>
                  <div>
                    {t`Block`} {property.block}
                  </div>
                  <div>{property.area} m²</div>
                  <div>{formatPrice(property.price)}</div>
                  <PropertyStatus status={property.status}>
                    {property.status}
                  </PropertyStatus>
                </PropertyDetails>
              </PropertyCard>
            ))}
          </PropertiesGrid>
        )}

        {activeTab === 'masterplan' && (
          <div>
            <MasterPlanImage
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop"
              alt="Master Plan"
            />
          </div>
        )}

        {activeTab === 'files' && (
          <FilesList>
            {mockProjectFiles.map((file) => (
              <FileItem key={file.id}>
                <FileInfo>
                  <FileIcon>📄</FileIcon>
                  <div>
                    <FileName>{file.name}</FileName>
                    <FileMeta>
                      {file.size} · {file.date}
                    </FileMeta>
                  </div>
                </FileInfo>
              </FileItem>
            ))}
          </FilesList>
        )}

        {activeTab === 'activities' && (
          <Placeholder>{t`Activities feature coming in Epic 7 (Operations)`}</Placeholder>
        )}
      </TabContent>
    </Container>
  );
};
