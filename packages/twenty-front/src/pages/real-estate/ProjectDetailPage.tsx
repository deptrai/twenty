import { ProjectDetailTabs } from '@/real-estate/components/ProjectDetailTabs';
import { mockProjects, mockProperties } from '@/real-estate/data/mock-data';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useNavigate, useParams } from 'react-router-dom';

const BackButton = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

const NotFound = styled.div`
  color: #a0a0a0;
  font-size: 16px;
  padding: 48px;
  text-align: center;
`;

export const ProjectDetailPage = () => {
  const { t } = useLingui();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = mockProjects.find((p) => p.id === id);
  const properties = mockProperties.filter((p) => p.projectId === id);

  if (!project) {
    return (
      <PageContainer>
        <NotFound>{t`Project not found`}</NotFound>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton onClick={() => navigate('/real-estate/projects')}>
        ← {t`Back to Projects`}
      </BackButton>
      <ProjectDetailTabs project={project} properties={properties} />
    </PageContainer>
  );
};
