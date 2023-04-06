import {  useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Tab, Tabs, Modal, Button, Toast, ToastContainer} from "react-bootstrap"; 
import { AuthContext } from "../../contexts/AuthContext";
import { ProfileForm } from '../../components/Profile/Form'
import * as service from "../../firebase/auth";
import { deletarUsuario } from "../../firebase/auth";
import { EmailAndPassword } from '../../components/Profile/EmailAndPassword'
import { Avatar } from "../../components/Avatar/index"
import { ThemeContext } from '../../contexts/ThemeContext';
import "./style.css"
import { UploadImage } from "../../components/UploadImage";


export function Profile(props) {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [showToastName, setShowToastName] = useState(false);
  const [show, setShow] = useState(false);
  const user = useContext(AuthContext)
  const providerIsPassword = user.providerData.find((provider) => provider.providerId === 'password')
  const [activeTab, setActiveTab] = useState("profile");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const withoutDisplayName = user?.email
  ? user.email.substring(0, user.email?.indexOf("@")).toUpperCase()
  : null;
  
  const resultado = useContext(ThemeContext)
  const temaClaro = resultado.temaClaro
  const displayName = user?.displayName || withoutDisplayName;
  const [name, setName] = useState(displayName || withoutDisplayName);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setName(displayName || withoutDisplayName);
    setUrl(url)

  }, [displayName]);

  async function deleteUser(data) {
    try {
      await deletarUsuario(data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  const updateProfile = async (data) => {
    try {
      await service.updateUser({
        displayName: data.displayName,
      });
      if (data.email && data.currentPassword) {
        await service.updateCurrentEmail(data);
      }
      setShowToastName(true);
    } catch (e) {
      console.error(e);
    }
  };

  
  const handleTabSelect = (key) => {
    setActiveTab(key);
  };


  const onUpdateEmail = async (data) => {
    console.log('onUpdateEmail', data)
    try {
       await service.updateCurrentEmail(data)
    } catch(e) {
      console.error(e)
    }
  }

  const onUpdatePassword = async (data, e) => {
    console.log('onUpdatePassword', data)
    try {
       await service.updateCurrentPassword(data)
       setShowToast(true);
       e.target.current.reset();
    } catch(e) {
      console.error(e)
    }
  }
 
  return (
    <Container className="d-flex justify-content-center align-items-center flex-column mt-5 profile-container-page">
      {showToast && (
        <ToastContainer className="p-3" position="top-center">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            bg="success"
            className="text-light"
          >
            <Toast.Header>
              <strong className="me-auto">Senha atualizada com sucesso!</strong>
            </Toast.Header>
            <Toast.Body>Sua senha foi atualizada com sucesso.</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      {showToastName && (
        <ToastContainer className="p-3" position="top-center">
          <Toast
            onClose={() => setShowToastName(false)}
            show={showToastName}
            delay={3000}
            autohide
            bg="success"
            className="text-light"
          >
            <Toast.Body>Dados atualizados com sucesso!</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <div className="hello-container">
        <div className="avatar-container-profile">
          <Avatar
            className="current-img"
            photoURL={user?.photoURL}
            size={{
              width: 100,
              height: 100,
            }}
          ></Avatar>
          <div className="upload-image">
            <UploadImage
               uploadImage={true}
               onUpload={(url) =>
                setUrl(url)
              }
            />
          </div>
        </div>
        <div className="name-container">
          <h3>Olá,</h3>
          {user ? <h1>{name}</h1> : <h3>Usuário(a)</h3>}
        </div>
      </div>
      <div className="profile-container">
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mt-5">
          <Tab eventKey="profile" title="Dados do perfil">
            <Card className={temaClaro ? "text-white bg-dark p-4 mt-4 shadow-lg" : "text-dark bg-white p-4 mt-4 shadow-lg"}>
              <ProfileForm user={user} onSubmit={updateProfile} />
            </Card>
            <div>
              <Button
                variant="danger"
                className="mt-5 mb-5"
                onClick={handleShow}
              >
                Excluir conta
              </Button>
            </div>
          </Tab>
          {providerIsPassword && (
            <Tab eventKey="password" title="Editar senha">
              <div style={{ marginTop: 40 }}>
                <h3 style={{ textAlign: "center" }}>Segurança</h3>
                <Card className="p-4 mt-4 shadow-lg">
                  <EmailAndPassword
                    user={user}
                    onUpdateEmail={onUpdateEmail}
                    onUpdatePassword={onUpdatePassword}
                  />
                </Card>
              </div>
            </Tab>
          )}
        </Tabs>
      </div>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Atenção !</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Você deseja excluir sua conta permanentemente ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => deleteUser(user)}>
              Confirmar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

