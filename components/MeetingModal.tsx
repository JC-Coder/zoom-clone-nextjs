import React, {ReactNode} from 'react'

type MeetingModalProps = {
    isOpen: boolean
    onClose: () => void
    title: string
    className?: string
    buttonText?: string
    handleClick?: () => void
    image?: string
    children?: ReactNode
    buttonIcon?: string;
}

const MeetingModal = ({isOpen, onClose, title, className, buttonText, handleClick, image, buttonIcon, children}: MeetingModalProps) => {
    return (
        <div>MeetingModal</div>
    )
}

export default MeetingModal
