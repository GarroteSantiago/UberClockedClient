import React, {useEffect} from "react";
import styles from "./DropDownMenu.module.scss";
import DropDownMenuTextButton from "../buttons/textButtons/dropDownTextButton/DropDownTextButton.js"
import DropDownMenuButton from "../buttons/dropDownButton/DropDownButton.js"
import DropDownMenuItem from "../dropDownMenu/dropDownMenuItem/DropDownMenuItem.js"

function DropDownMenu({options, buttonText = 'Placeholder'}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropDownRef = React.useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className={styles.dropDown} ref={dropDownRef}>
            <DropDownMenuButton onClick = {toggleMenu} isOpen={isOpen} text={buttonText} />
            {isOpen && (
                <div className={styles.dropDownMenu}>
                    {options.map((item, index) => (
                        <DropDownMenuItem index={index}>
                            <DropDownMenuTextButton text={item.text} route={item.route} />
                        </DropDownMenuItem>
                    ))}
                </div>
            )}
        </div>
    )
}
export default DropDownMenu;