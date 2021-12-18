import { Tooltip } from "antd";

const EntryText= ({ text, setIsOpenText }) => {
  return (
    <div>
      <Tooltip title="click to hide">
        <p onClick={() => setIsOpenText({id: ''})}>{text}</p>
      </Tooltip>
    </div>
  );
};
export default EntryText;
