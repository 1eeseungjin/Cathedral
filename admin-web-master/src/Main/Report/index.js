// 신고 및 문의 페이지

import React, { useEffect, useState } from 'react';
import reportApi from '../../@api/reportApi';
import './index.scss';
import SearchIcon from './icon/SearchIcon';
import dayjs from 'dayjs';
import Arrow from '../../@static/icon/Arrow.png';
import Sort from '../../@plugins/sort';

function Report() {
  const [sort, setSort] = useState({
    title: false,
    writer: false,
    reason: false,
    date: false,
  });

  const { getPostReports, restorePost, deletePost } = reportApi;

  const [posts, setPosts] = useState([]);

  const getReports = async () => {
    const reports = await getPostReports();
    setPosts(reports.reportList);
  };

  useEffect(async () => {
    await getReports();
  }, []);

  const onClickSort = (sort, value) => {
    Sort(posts, sort, value);
  };

  const onClickRestore = async (idx) => {
    await restorePost(idx);
    await getReports();
  };

  const onClickDeletePost = async (articleIdx, idx) => {
    await deletePost(articleIdx);
    await restorePost(idx);
    await getReports();
  };

  return (
    <>
      <div className="report">
        <div className="report-header">
          <div className="report-header-title">신고된 게시글</div>
          <div className="report-header-search">
            <input className="report-header-search-input" />
            <SearchIcon />
          </div>
        </div>

        <div className="report-content">
          <div className="report-content-header">
            <div className="report-content-header-title">
              블라인드 처리된 글 목록
            </div>
          </div>

          <div className="report-content-list">
            <div className="report-content-list-header">
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    title: !sort.title,
                  });

                  onClickSort(sort.title, 'title');
                }}
                className="report-content-list-header-title"
              >
                글 제목
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    writer: !sort.writer,
                  });

                  onClickSort(sort.writer, 'name');
                }}
                className="report-content-list-header-writer"
              >
                작성자
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    reason: !sort.reason,
                  });

                  onClickSort(sort.reason, 'reason');
                }}
                className="report-content-list-header-reason"
              >
                신고 사유
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    date: !sort.date,
                  });

                  onClickSort(sort.date, 'created_at');
                }}
                className="report-content-list-header-date"
              >
                신고 일시
                <img src={Arrow} />
              </div>
            </div>

            <div className="report-content-list-data">
              {posts.map((post) => {
                return (
                  <>
                    <div className="report-content-list-data-wrap">
                      <div className="report-content-list-data-title">
                        {post.title}
                      </div>
                      <div className="report-content-list-data-writer">
                        {post.name}
                      </div>
                      <div className="report-content-list-data-reason">
                        {post.reason}
                      </div>
                      <div className="report-content-list-data-date">
                        {dayjs(post.created_at).format('YYYY.MM.DD')}
                      </div>
                      <div className="report-content-list-data-btns">
                        <div
                          onClick={() => {
                            if (window.confirm('이 글을 복구하시겠습니까?')) {
                              onClickRestore(post.idx);
                            }
                          }}
                          className="report-content-list-data-restore"
                        >
                          글 복구
                        </div>
                        <div
                          onClick={() => {
                            if (window.confirm('이 글을 삭제하시겠습니까?')) {
                              onClickDeletePost(post.article_idx, post.idx);
                            }
                          }}
                          className="report-content-list-data-del"
                        >
                          글 삭제
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
