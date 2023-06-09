import React from 'react'
import { ProjectState } from '../../../Redux/Templates/ProjectInitialState';
import { useAppDispatch } from '../../../store';
import { setAboutUsPage, setContactUsPage } from '../../../Redux/Templates/ProjectSlice';

const PagesForm: React.FC<{ project: ProjectState }> = ({ project }) => {
  const dispatch = useAppDispatch();

  const handleAddContactUsPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setContactUsPage(e.target.value !== "no"));
  };

  const handleAddAboutUsPage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setAboutUsPage(e.target.value));
  };

  return (
    <form className='form'>
      <div className="input-containers">
        <label className="label">Add Contact Us page?</label>


        <div className="radio-group">

          <div className="group-input">
            <div className="radio-item-point">
              <input
                type="radio"
                name="contactUs"
                value="yes"
                checked={project.template.contactUs}
                onChange={handleAddContactUsPage}
              />
              <span className="radio-label">Yes</span>
            </div>
            <div className="radio-item-point">
              <input
                type="radio"
                name="contactUs"
                value="no"
                checked={!project.template.contactUs}
                onChange={handleAddContactUsPage}
              />
              <span className="radio-label">No</span>
            </div>
          </div>
        </div>
      </div>
      <div className="input-containers">
          <label className="label">Add About Us page:</label>
          <textarea
            rows={20}
            value={project.template.aboutUs}
            placeholder='Write a paragraph to show on your "About Us" page'
            onChange={handleAddAboutUsPage}
            id='aboutUs'
          />
        </div>
    </form>
  )
}

export default PagesForm;