import { useState } from "react";
import { useWhatsapp } from "../../context/WhatsappContext";
import { GreenButtonBg } from "../ui/GreenButtonBg";
import {
  WhatsappIconsContainer,
  WhatsappOption,
  WhatsappOptions,
  WhatsappOptionsContainerButton,
  WhatsappOptionsContainerOptions,
} from "../ui/WhatsappOptions/WhatsappOptions";
import { TbEdit } from "react-icons/tb";
import { DeleteCross } from "../ui/icons/DeleteCross.jsx";
// Convertir en renderizado e intentar separar la logica
export function GruposDisponibles() {
  const {
    availableMessageGroups,
    selectedMessageGroup,
    fetchGroupData,
    toggleShowComponent,deleteMessageGroup
  } = useWhatsapp();
  const [innerSelectedMessageGroup, setInnerSelectedMessageGroup] =
    useState(selectedMessageGroup);

  const handleChangeGroupButton = (group) => () => {
    setInnerSelectedMessageGroup(group);
  };

  const handleSubmitSelection = () => {
    fetchGroupData(innerSelectedMessageGroup.ID_MESSAGE_GROUP);
  };
  const handleShowAddNewMessageGroup = () => {
    toggleShowComponent("NewMessageGroupForm");
  };
  const handleDeleteMessageGroup = ({ID_MESSAGE_GROUP,NAME}) => () => {
    if(confirm(`¿Estas seguro de eliminar el grupo de mensajes '${NAME}'?\nse eliminar todos los registros y los mensajes asociados`))  
    deleteMessageGroup(ID_MESSAGE_GROUP)
  }


  return (
    <WhatsappOptions
      title={"Grupos disponibles"}
      toggleString={"AvailableGroups"}
    >
      <WhatsappOptionsContainerOptions>
        {availableMessageGroups.map((group, i) => (
          <WhatsappOption
            key={i}
            isSelected={innerSelectedMessageGroup.NAME == group.NAME}
            onClick={handleChangeGroupButton(group)}
          >
            <span>{group.NAME}</span>
            <WhatsappIconsContainer>
              <TbEdit title="Editar" className="text-blue-800 hover:text-blue-600" />
              <DeleteCross onClick={handleDeleteMessageGroup(group)}/>
            </WhatsappIconsContainer>

          </WhatsappOption>
        ))}
      </WhatsappOptionsContainerOptions>

      <WhatsappOptionsContainerButton>
        <GreenButtonBg
          className={"flex-1 mx-0 my-0"}
          onClick={handleSubmitSelection}
        >
          Cargar
        </GreenButtonBg>
        <GreenButtonBg
          className={"flex-1 mx-0 my-0"}
          onClick={handleShowAddNewMessageGroup}
        >
          Nuevo
        </GreenButtonBg>
      </WhatsappOptionsContainerButton>
    </WhatsappOptions>
  );
}
