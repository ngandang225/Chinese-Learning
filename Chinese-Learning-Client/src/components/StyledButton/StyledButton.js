import { Button } from '@mui/material';
function StyledButton(props) {
  const { onClick, disabled, content, type = 'primary' } = props;
  const style =
    type === 'primary'
      ? {
          fontSize: '1.6rem',
          backgroundColor: '#ffeb3b',
          color: '#000',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#fbc02d',
          },
        }
      : type === 'border-accent'
      ? {
          fontSize: '1.6rem',
          backgroundColor: '#fff',
          border: '2px solid #fdd835',
          color: '#fdd835',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#fbc02d',
            color: '#000',
            border: '2px solid #fbc02d',
          },
        }
      : null;
  return (
    <Button size="small" variant="contained" sx={style} onClick={onClick} disabled={disabled}>
      {content}
    </Button>
  );
}

export default StyledButton;
