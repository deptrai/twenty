import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { type Project } from '../types';

interface ProjectsTableProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
}

const Container = styled.div`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
`;

const SearchBar = styled.div`
  border-bottom: 1px solid #2a2a2a;
  padding: 16px 24px;
`;

const SearchInput = styled.input`
  width: 300px;
  background: #0d0d0d;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 8px 16px;
  color: #ffffff;
  font-size: 14px;

  &::placeholder {
    color: #a0a0a0;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th`
  background: #141414;
  border-bottom: 1px solid #2a2a2a;
  color: #a0a0a0;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 16px 24px;
  text-align: left;
  text-transform: uppercase;
`;

const Td = styled.td`
  padding: 16px 24px;
  color: #ffffff;
  font-size: 14px;
  border-bottom: 1px solid #2a2a2a;
`;

const Tr = styled.tr`
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #1f1f1f;
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProjectImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
`;

const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ProjectName = styled.div`
  color: #ffffff;
  font-weight: 500;
`;

const ProjectDeveloper = styled.div`
  color: #a0a0a0;
  font-size: 12px;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ status }) => {
    switch (status) {
      case 'ACTIVE':
        return '#22c55e20';
      case 'PLANNING':
        return '#eab30820';
      case 'COMPLETED':
        return '#3b82f620';
      default:
        return '#a0a0a020';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'ACTIVE':
        return '#22c55e';
      case 'PLANNING':
        return '#eab308';
      case 'COMPLETED':
        return '#3b82f6';
      default:
        return '#a0a0a0';
    }
  }};
`;

export const ProjectsTable = ({
  projects,
  onProjectClick,
}: ProjectsTableProps) => {
  const { t } = useLingui();

  const formatPrice = (price: number) => {
    return (price / 1_000_000_000).toFixed(1) + 'B VND';
  };

  return (
    <Container>
      <SearchBar>
        <SearchInput type="text" placeholder={t`Search projects...`} />
      </SearchBar>
      <Table>
        <thead>
          <tr>
            <Th>{t`Name`}</Th>
            <Th>{t`Location`}</Th>
            <Th>{t`Status`}</Th>
            <Th>{t`Total`}</Th>
            <Th>{t`Available`}</Th>
            <Th>{t`Price From`}</Th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <Tr key={project.id} onClick={() => onProjectClick(project.id)}>
              <Td>
                <ProjectInfo>
                  {project.imageUrl && (
                    <ProjectImage src={project.imageUrl} alt={project.name} />
                  )}
                  <ProjectDetails>
                    <ProjectName>{project.name}</ProjectName>
                    <ProjectDeveloper>{project.developer}</ProjectDeveloper>
                  </ProjectDetails>
                </ProjectInfo>
              </Td>
              <Td>{project.location}</Td>
              <Td>
                <StatusBadge status={project.status}>
                  {project.status}
                </StatusBadge>
              </Td>
              <Td>{project.totalProperties}</Td>
              <Td>{project.availableProperties}</Td>
              <Td>{formatPrice(project.priceFrom)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
