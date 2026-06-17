import { Filter } from 'lucide-react';

interface JobFiltersProps {
  filters: {
    type: string;
    department: string;
    location: string;
  };
  setFilters: (filters: any) => void;
}

export function JobFilters({ filters, setFilters }: JobFiltersProps) {
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Analytics'];
  const locations = ['San Francisco', 'New York', 'Austin', 'Chicago', 'Remote'];

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: prev[key] === value ? '' : value
    }));
  };

  const clearFilters = () => {
    setFilters({ type: '', department: '', location: '' });
  };

  const hasActiveFilters = filters.type || filters.department || filters.location;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3>Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Job Type Filter */}
      <div className="mb-6">
        <h4 className="mb-3 text-gray-700">Job Type</h4>
        <div className="space-y-2">
          {jobTypes.map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.type === type}
                onChange={() => handleFilterChange('type', type)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Department Filter */}
      <div className="mb-6">
        <h4 className="mb-3 text-gray-700">Department</h4>
        <div className="space-y-2">
          {departments.map(dept => (
            <label key={dept} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.department === dept}
                onChange={() => handleFilterChange('department', dept)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">{dept}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <h4 className="mb-3 text-gray-700">Location</h4>
        <div className="space-y-2">
          {locations.map(loc => (
            <label key={loc} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.location === loc}
                onChange={() => handleFilterChange('location', loc)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">{loc}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
