
// export function MailFolders(){

//     const folders=[
//         {folderName:'Inbox', value:'inbox'},
//         {folderName:'Sent', value:'sent'},
//         {folderName:'Drafts', value:'drafts'},
//         {folderName:'Trash', value:'trash'},
//         {folderName:'All', value:'all'}
//     ]

//     return(
// <section className="mail-folders-container">
//     <ul>
//         {folders.map(folder=>)}
//     </ul>
// </section>
//     )
// }
export function MailFolderList(currFolder, onSelectMailFolder) {
    
    return (
        <div className="mail-folders-container">
            <ul className="mail-folders flex column">
                <li>
                    <button className="flex" onClick={() => onSelectMailFolder('inbox')}>
                        <i className="fa-solid fa-inbox"></i> <span>Inbox</span>
                    </button>
                </li>
                <li>
                    <button className="flex" onClick={() => onSelectMailFolder('sent')}>
                        <i class="fa-regular fa-paper-plane"></i> <span>Sent</span>
                    </button>

                </li>
                <li>
                    <button className="flex" onClick={() => onSelectMailFolder('drafts')}>
                        <i className="fa-regular fa-file-lines"></i> <span>Drafts</span>
                    </button>
                </li>
                <li>
                    <button className="flex" onClick={() => onSelectMailFolder('trash')}>
                        <i className="fa-solid fa-trash"></i> <span>Trash</span>
                    </button>
                </li>
                <li>
                    <button className="flex" onClick={() => onSelectMailFolder('all')}>
                        <i className="fa-regular fa-folder"></i> <span>All</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}
