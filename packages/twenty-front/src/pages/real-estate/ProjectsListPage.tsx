import { ProjectsTable } from '@/real-estate/components/ProjectsTable';
import { mockProjects } from '@/real-estate/data/mock-data';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useNavigate } from 'react-router-dom';

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #a0a0a0;
  margin: 0;
`;

export const ProjectsListPage = () => {
  const { t } = useLingui();
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    navigate(`/real-estate/projects/${projectId}`);
  };

  return (
    <PageContainer>
      <Header>
        <Title>{t`Projects`}</Title>
        <Subtitle>
          {mockProjects.length} {t`projects`}
        </Subtitle>
      </Header>
      <ProjectsTable
        projects={mockProjects}
        onProjectClick={handleProjectClick}
      />
    </PageContainer>
  );
};
