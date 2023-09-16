

const Paginator = ({ page, lastPage, changePage }: { page: number, lastPage: number, changePage: (page: number) => void }) => {

    const next = () => {
        page < lastPage && changePage(page + 1)
    }

    const prev = () => { page > 1 && changePage(page - 1) }

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><button className="page-link" onClick={() => prev()}>Previous</button></li>
                    <li className="page-item"><button className="page-link" onClick={() => next()}>Next</button></li>
                </ul>
            </nav>
        </>
    )
}

export default Paginator