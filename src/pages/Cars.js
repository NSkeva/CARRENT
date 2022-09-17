import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Cars.css'
import {resourceData , setCars , getCars} from '../data/resourceData'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {db} from '../firebase'

export default function Cars() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(false);
  const [reg, setReg] = React.useState(false);
  const [link, setLink] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    resourceData.sort((a,b) =>{
      return a.id - b.id;
    });
    var id = resourceData.length + 1
    resourceData.push({text: name , id: id, desc: reg, imgLink: link})
    setCars();
    setOpen(false);
    //reload();
  };

  const reload=()=>window.location.reload();
  
  const carList = resourceData.map(
    (element) => {
      console.log("ide gas")
      return (
        
        <ListItem key = {resourceData.id}>
        <ListItemAvatar>
          <Avatar>
            <img src={element.imgLink} /> 
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={element.text} secondary={element.desc} />
      </ListItem>
      
      )
    }
  )

  return (
    <div>
      

      <div id="car_container">
        <Button variant="outlined" onClick={handleClickOpen}>
          New Car
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Car</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="regiopis"
              label="Registracija i opis"
              fullWidth
              variant="standard"
              onChange={(e) => setReg(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="imgLink"
              label="Link na sliku"
              fullWidth
              variant="standard"
              onChange={(e) => setLink(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        {resourceData.map(({ id, text, desc, imgLink }) => (
            <div key={id}>
                <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <img src={imgLink} /> 
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={text} secondary={desc} />
              </ListItem>
            </div>
        ))}
      </div>

    </div>
  );
}
