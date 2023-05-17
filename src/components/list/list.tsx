import * as React from 'react';
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function IndeterminateCheckbox() {
  const [checkedDesign, setCheckedDesign] = React.useState([false, false, false]);
  const [checkedCustomer, setCheckedCustomer] = React.useState([false, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDesign([event.target.checked, event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDesign([event.target.checked, checkedDesign[1], checkedDesign[2]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDesign([checkedDesign[0], event.target.checked, checkedDesign[2]]);
  };

  const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDesign([checkedDesign[0], checkedDesign[1], event.target.checked]);
  };

  const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedCustomer([event.target.checked, event.target.checked]);
  };

  const handleChange6 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedCustomer([event.target.checked, checkedCustomer[1]]);
  };

  const handleChange7 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedCustomer([checkedCustomer[0], event.target.checked]);
  };

  const design_children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="graphic design"
        control={<Checkbox checked={checkedDesign[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="product design"
        control={<Checkbox checked={checkedDesign[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="web design"
        control={<Checkbox checked={checkedDesign[2]} onChange={handleChange4} />}
      />
    </Box>
  );

  const customer_service_children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="support"
        control={<Checkbox checked={checkedCustomer[0]} onChange={handleChange6} />}
      />
      <FormControlLabel
        label="customer success"
        control={<Checkbox checked={checkedCustomer[1]} onChange={handleChange7} />}
      />
    </Box>
  );

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-design" id="panel-design-header">
          <FormControlLabel
            label="Design"
            control={
              <Checkbox
                checked={checkedDesign[0] && checkedDesign[1] && checkedDesign[2]}
                onChange={handleChange1}
              />
            }
          />
        </AccordionSummary>
        <AccordionDetails>
          {design_children}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-customer-service" id="panel-customer-service-header">
          <FormControlLabel
            label="Customer Service"
            control={
              <Checkbox
                checked={checkedCustomer[0] && checkedCustomer[1]}
                onChange={handleChange5}
              />
            }
          />
        </AccordionSummary>
        <AccordionDetails>
          {customer_service_children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
