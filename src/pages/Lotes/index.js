import React, { useEffect, useState, useContext } from "react";
import Principal from "../../components/Lote/Principal";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import api from "../../services/api";
import {UtilContext} from '../../Contexts/util';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "90%",
  },
  newButton: {
    position: "absolute",
    right: "5px",
  },
}));

const headCells = [
  { id: "imogeo", label: "Codigo" },
  { id: "imosql", label: "SQL" },
  { id: "imomun", label: "Municipio" },
  { id: "imobai", label: "Bairro" },
  { id: "acoes", label: "Ações", disableSorting: true },
];

export default function Employees() {
  const {setQuantLotes} = useContext(UtilContext)
  const classes = useStyles();
  const [atual, setAtual] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]); 
  const [filtro, setFiltro] = useState([]);
  
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });


  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(filtro, headCells, filterFn); 

  useEffect(() => {
    async function loadLotes() {
      try {
        const pesq = {
          query: `SELECT * FROM tblimo ORDER BY imogeo ASC`,
        };
        const response = await api.post("/lotes", pesq);
        setRecords(response.data.response.lotes);
        setFiltro(response.data.response.lotes);
        setQuantLotes(response.data.response.lotes.length.toString())
      
      } catch {}
    }
    loadLotes();
  }, [atual]);

  const handleSearch = (e) => {
    let target = e.target;
    setFiltro(
      records.filter(
        (item) =>
          item.imosql.toLowerCase().indexOf(target.value.toLocaleLowerCase()) > -1
      )
    );
  };

  const handleSearchM = (e) => {
    let target = e.target;
    setFiltro(
      records.filter(
        (item) =>
          item.imosql.toLowerCase().indexOf(target.value.toLocaleLowerCase()) > -1
      )
    );
  };

 

  const addOrEdit = (lote, resetForm) => {
    
    if (lote.imoid === 0) {
      async function updateLote() {
        try {
          const query = {
            query: `UPDATE tblimo SET imosql = '${lote.imosql}' WHERE imoid = ${lote.imoid}`,
          };
          await api.post("/lotes", query);
          setAtual(!atual);
        } catch (err) {
          console.log(err);
        }
      }
      updateLote();
    } else {
      
      async function updateLote() {
        try {

          let valores = "";
          Object.keys(lote).forEach((item) => {
            let val = "";
            if (lote[item] == null || lote[item] === 'undefined') val = "";
            else val = lote[item];
            
            valores += `${item} = '${val}',`;
          });

           valores = valores.substring(0,valores.length-1);

          const query = {
            query: `UPDATE tblimo SET ${valores} WHERE imoid = ${lote.imoid}`,
          };        

        const response =  await api.post("/lotes", query);
        console.log(response.status)
        
        if(response.status === 200){
          setNotify({
            isOpen: true,
            message: 'Registro atualizado com sucesso!!!',
            type: "success",
          });      
       
        }else{
          setNotify({
            isOpen: true,
            message: 'Ops! Ocorreu um erro ao tentar atualizar',
            type: "error",
          });       
       
        }
        
          setAtual(!atual);

        } catch (err) {
          console.log(err);
        }
      }
      updateLote();
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(filtro);
    
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    async function dellLote() {
      const query = {
        query: `DELETE FROM tblimo WHERE imoid = ${id}`,
      };
      try {
        await api.post(`/lotes`, query);
        setAtual(!atual);
      } catch (err) {
        console.log(err);
      }
    }
    dellLote();

    setNotify({
      isOpen: true,
      message: "Deletado com sucesso",
      type: "error",
    });
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Pesquisa (sql)"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Input
            label="Município"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearchM}
          />
          <Controls.Button
            text="Novo lote"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.imoid}>
                <TableCell>{item.imogeo}</TableCell>
                <TableCell>{item.imosql}</TableCell>
                <TableCell>{item.imomun}</TableCell>
                <TableCell>{item.imobai}</TableCell>

                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>

                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Deseja realmente deletar lote?",
                        subTitle: "Você pode voltar da operação",
                        onConfirm: () => {
                          onDelete(item.imoid);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>

      <Popup
        title="Formulario lote"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Principal recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
