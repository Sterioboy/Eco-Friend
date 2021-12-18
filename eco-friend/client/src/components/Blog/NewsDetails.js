import { Tooltip } from "antd";

const NewsDetails = ({  text, setIsOpenText }) => {
  return (
    <div>
      <Tooltip title="click to hide">
        <p onClick={() => setIsOpenText({ id: '' })}>{text}</p>
      </Tooltip>
    </div>
  );
};
export default NewsDetails;
