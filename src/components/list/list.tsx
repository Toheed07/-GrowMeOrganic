import React, { useState } from 'react';
import { List, ListItem, ListItemText, Checkbox, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
// Define the models/interfaces for department and sub-department
interface SubDepartment {
  name: string;
  selected: boolean;
}

interface Department {
  department: string;
  subDepartments: SubDepartment[];
  selected: boolean;
}

const DepartmentList = () => {

  const [departments, setDepartments] = useState<Department[]>([

    {
      department: 'customer_service',
      subDepartments: [
        { name: 'support', selected: false },
        { name: 'customer_success', selected: false },
      ],
      selected: false,
    },
    {
      department: 'design',
      subDepartments: [
        { name: 'graphic_design', selected: false },
        { name: 'product_design', selected: false },
        { name: 'web_design', selected: false },
      ],
      selected: false,
    },
  ]);

  const handleDepartmentClick = (departmentIndex: number) => {
    const updatedDepartments = [...departments];
    const selectedDepartment = updatedDepartments[departmentIndex];
    selectedDepartment.selected = !selectedDepartment.selected;

    selectedDepartment.subDepartments.forEach((subDepartment) => {
      subDepartment.selected = selectedDepartment.selected;
    });

    setDepartments(updatedDepartments);
  };

  const handleSubDepartmentClick = (departmentIndex: number, subDepartmentIndex: number) => {
    const updatedDepartments = [...departments];
    const selectedSubDepartment = updatedDepartments[departmentIndex].subDepartments[subDepartmentIndex];
    selectedSubDepartment.selected = !selectedSubDepartment.selected;

    // Check if all sub-departments of the department are selected
    const allSubDepartmentsSelected = updatedDepartments[departmentIndex].subDepartments.every(
      (subDepartment) => subDepartment.selected
    );

    // Update the selected status of the department based on the sub-departments' selection status
    updatedDepartments[departmentIndex].selected = allSubDepartmentsSelected;

    setDepartments(updatedDepartments);
  };

  return (
    
    <List>
      {departments.map((department, departmentIndex) => (
        <React.Fragment key={department.department}>
          <ListItem
            button
            onClick={() => handleDepartmentClick(departmentIndex)}
          >
            <Checkbox
              checked={department.selected}
              disableRipple
              color="primary"
              edge="start"
              tabIndex={-1}
              inputProps={{ 'aria-labelledby': `department-label-${departmentIndex}` }}
            />
            <ListItemText id={`department-label-${departmentIndex}`} primary={department.department} />
            {department.selected ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={department.selected} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDepartment, subDepartmentIndex) => (
                <ListItem
                  key={subDepartment.name}
                  button
                  onClick={() => handleSubDepartmentClick(departmentIndex, subDepartmentIndex)}
                  sx={{ paddingLeft: 4 }}
                >
                  <Checkbox
                    checked={subDepartment.selected}
                    disableRipple
                    color="primary"
                    edge="start"
                    tabIndex={-1}
                    inputProps={{ 'aria-labelledby': `sub-department-label-${departmentIndex}-${subDepartmentIndex}` }}
                  />
                  <ListItemText
                    id={`sub-department-label-${departmentIndex}-${subDepartmentIndex}`}
                    primary={subDepartment.name}
                  />
                </ListItem>
              ))}
            </List>

      </Collapse>
    </React.Fragment>
  ))}
</List>
);
};


export default DepartmentList;
